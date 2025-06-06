import {
  type LightbulbIcon as LucideProps,
  TheaterIcon as TheatreIcon,
  Users,
  CircleIcon,
  LayoutIcon,
  GlassWater,
} from "lucide-react"

interface SeatingIconProps extends LucideProps {
  style: string
}

export function SeatingIcon({ style, ...props }: SeatingIconProps) {
  switch (style.toLowerCase()) {
    case "theatre":
      return <TheatreIcon {...props} />
    case "classroom":
      return <LayoutIcon {...props} />
    case "ushaped":
      return <Users {...props} />
    case "boardroom":
      return <Users {...props} />
    case "reception":
      return <GlassWater {...props} />
    case "circular":
      return <CircleIcon {...props} />
    default:
      return <Users {...props} />
  }
}
