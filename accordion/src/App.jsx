import Accordion from "./Accordion";
import "./App.css";

export default function App() {
  const items = [
    {
      title: "Love Is War",
      content:
        "A romantic comedy where two brilliant students wage psychological battles, each trying to make the other confess their love first.",
    },
    {
      title: "Toradora!",
      content:
        "A heartfelt high school romance about unlikely friendships, misunderstandings, and discovering love in unexpected places.",
    },
    {
      title: "A Silent Voice",
      content:
        "An emotional story about bullying, redemption, and forgiveness, following a former bully seeking to make amends with a deaf girl.",
    },
    {
      title: "Tokyo Ghoul",
      content:
        "A dark fantasy anime exploring identity and survival, where a college student becomes half-ghoul and struggles between two worlds.",
    },
    {
      title: "Love Through a Prism",
      content:
        "A tender coming-of-age story that explores love, self-discovery, and relationships through different emotional perspectives.",
    },
  ];

  return <Accordion items={items} />;
}
