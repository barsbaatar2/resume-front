import { ResponsiveWrapper } from "./responsive-wrapper"

export default function ServerComponent() {
  return <ResponsiveWrapper mobileContent={<div>Mobile Content</div>} desktopContent={<div>Desktop Content</div>} />
}

