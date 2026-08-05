import { Link, usePage } from "@inertiajs/react"
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"

export function NavMain({
  items,
}: {
  items: {
    title: string
    url: string
    icon?: React.ReactNode
  }[]
}) {
  const { url } = usePage()
  const currentPath = url.split("?")[0]

  const activeItem = items.reduce(
    (best, item) => {
      if (item.url === "#" || item.url === "/") {
        return currentPath === item.url ? item : best
      }

      const isMatch =
        currentPath === item.url || currentPath.startsWith(item.url + "/")

      if (isMatch && (!best || item.url.length > best.url.length)) {
        return item
      }

      return best
    },
    null as (typeof items)[number] | null,
  )

  return (
    <SidebarGroup>
      <SidebarGroupContent className="flex flex-col gap-2">
        <SidebarMenu>
          {items.map((item) => {
            const isActive = item === activeItem

            return (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton
                  tooltip={item.title}
                  isActive={isActive}
                  render={<Link href={item.url} />}
                >
                  {item.icon}
                  <span>{item.title}</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            )
          })}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  )
}
