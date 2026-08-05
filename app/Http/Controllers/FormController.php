<?php

namespace App\Http\Controllers;

use App\Enums\FieldTypeEnum;
use App\Http\Requests\Forms\SearchFormRequest;
use App\Http\Requests\Forms\StoreFormRequest;
use App\Http\Requests\Forms\UpdateFormRequest;
use App\Models\Form;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Inertia\Response;

class FormController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(SearchFormRequest $request): Response
    {
        $data = $request->validated();

        $forms = Form::where('user_id', Auth::id())
            ->when($data['search'] ?? null, function ($query) use ($data) {
                $query->where('name', 'like', "%{$data['search']}%");
            })
            ->paginate($data['per_page'] ?? 10);

        return inertia('forms/index', compact('forms'));
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(): Response
    {
        $types = FieldTypeEnum::cases();

        return inertia('forms/create', compact('types'));
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreFormRequest $request): RedirectResponse
    {
        $data = $request->validated();

        $form = DB::transaction(function () use ($data) {
            $form = Form::create([
                'user_id' => Auth::id(),
                'name' => $data['name'],
                'description' => $data['description'],
            ]);

            $this->syncFields($form, $data['fields']);

            return $form;
        });

        return redirect()->route('forms.index');
    }

    /**
     * Display the specified resource.
     */
    public function show(Form $form): Response
    {
        $this->ensureOwned($form);

        $form->load('fields');

        return inertia('forms/show', compact('form'));
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Form $form): Response
    {
        $this->ensureOwned($form);

        return inertia('forms/edit', compact('form'));
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateFormRequest $request, Form $form): RedirectResponse
    {
        $this->ensureOwned($form);

        $data = $request->validated();

        DB::transaction(function () use ($form, $data) {
            $form->update([
                'name' => $data['name'],
                'description' => $data['description'],
            ]);

            $form->fields()->delete();

            $this->syncFields($form, $data['fields']);
        });

        return redirect()->route('forms.index');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Form $form): RedirectResponse
    {
        $this->ensureOwned($form);

        $form->delete();

        return redirect()->route('forms.index');
    }

    /**
     * Ensure the authenticated user owns the given form.
     */
    private function ensureOwned(Form $form): void
    {
        if ($form->user_id !== Auth::id()) {
            abort(404);
        }
    }

    /**
     * Create field records for the given form.
     *
     * @param  array<int, array<string, mixed>>  $fields
     */
    private function syncFields(Form $form, array $fields): void
    {
        foreach ($fields as $field) {
            $form->fields()->create($field);
        }
    }
}
