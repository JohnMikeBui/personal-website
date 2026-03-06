import AsciiStrip from "./AsciiStrip";
import Clock from "./Clock";

const DAILY_QUESTIONS = [
  { q: "What's your favorite pizza topping?", a: "I like jalapeños and pineapple!" },
  { q: "What's your favorite ice cream flavor?", a: "Mine's Texas Sheet Cake from Jeni's" },
  { q: "What's your favorite movie?", a: "Mine is the Peanuts Movie!" },
  { q: "What's your favorite place you've ever traveled to?", a: "I like my bed!" },
  { q: "What's your favorite snack?", a: "I like to eat!" },
  { q: "What's your favorite song right now?", a: "I don't listen to music." },
  { q: "What's your favorite way to spend a weekend?", a: "I play basketball!" },
  { q: "What's your favorite restaurant?", a: "TACO BELL!" },
  { q: "What's your favorite childhood cartoon?", a: "Spongebob is so GOATED!" },
  { q: "What's your favorite type of cuisine?", a: "Mmmm, I like mexican food :P" },
  { q: "What's your favorite hobby?", a: "I like to workout and play piano!" },
];

function getDailyQuestion() {
  const dayOfYear = Math.floor(
    (new Date() - new Date(new Date().getFullYear(), 0, 0)) / 86400000
  );
  return DAILY_QUESTIONS[dayOfYear % DAILY_QUESTIONS.length];
}

export default function Hero() {
  const question = getDailyQuestion();

  return (
    <section id="work" style={{ padding: "0" }}>
      <AsciiStrip />

      <div style={{ padding: "0 2.5rem" }}>
        <div style={{
          display: "grid", gridTemplateColumns: "1fr 1fr 1fr",
          gap: "2rem", paddingBottom: "3rem",
        }}>
          {/* Col 1: Name */}
          <h1 style={{
            fontFamily: "'DM Serif Display', serif",
            fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)",
            fontWeight: 400, fontStyle: "italic",
            color: "#1a1a1a", lineHeight: 1.1,
            letterSpacing: "-0.01em",
          }}>
            John Bui
          </h1>

          {/* Col 2: Bio + location */}
          <div>
            <p style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: "0.9rem", color: "#555",
              lineHeight: 1.8, fontWeight: 400,
              marginBottom: "0.75rem",
            }}>
              I'm a software engineer with a love for clean architecture, thoughtful
              interfaces, and shipping things that actually work. Currently working at Georgia Tech.
            </p>
            <p style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: "0.9rem", color: "#999",
              lineHeight: 1.8,
            }}>
              Based in Houston, where it's currently <Clock />.
            </p>
          </div>

          {/* Col 3: Daily question */}
          <div>
            <p style={{
              fontFamily: "'DM Mono', monospace",
              fontSize: "0.62rem", letterSpacing: "0.12em",
              color: "#bbb", textTransform: "uppercase",
              marginBottom: "0.5rem",
            }}>
              Question of the day
            </p>
            <p style={{
              fontFamily: "'DM Sans', sans-serif",
              fontStyle: "italic",
              fontSize: "0.95rem", color: "#888",
              lineHeight: 1.7,
            }}>
              {question.q}
            </p>
            <p style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: "0.85rem", color: "#888",
              lineHeight: 1.7, marginTop: "0.4rem",
            }}>
              {question.a}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
