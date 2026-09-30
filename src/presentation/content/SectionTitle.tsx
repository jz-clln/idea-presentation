import { Title, type TextProps } from "./Title";

/** The heading that opens most slides. */
export function SectionTitle(props: TextProps) {
  return <Title as="h2" size="section" {...props} />;
}
