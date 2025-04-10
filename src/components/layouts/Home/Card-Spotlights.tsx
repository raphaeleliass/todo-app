import { CardSpotlight } from "@/components/ui/card-spotlight";
import { CheckCircle } from "lucide-react";

export default function CardSpotlights() {
  const contents = [
    {
      title: "Be productive",
      description: "Organize your tasks efficiently",
      resons: ["Create tasks", "Set priorities", "Track progress"],
      subdescription:
        "Boost your daily productivity with organized task management",
    },
    {
      title: "Stay focused",
      description: "Maintain concentration on what matters",
      resons: ["Minimize distractions", "Set clear goals", "Follow schedules"],
      subdescription: "Keep your mind clear and focused on important tasks",
    },
    {
      title: "Achieve more",
      description: "Reach your goals effectively",
      resons: ["Monitor progress", "Celebrate wins", "Adjust strategies"],
      subdescription:
        "Turn your goals into accomplishments with structured planning",
    },
  ];

  return (
    <section className="container mt-32 flex flex-col items-center justify-center">
      <h2>Unlock Your Potential</h2>
      <p className="mt-2 text-center text-neutral-500">
        Discover how our features can help you succeed.
      </p>
      <div className="mt-10 flex flex-row flex-wrap items-center justify-center gap-2">
        {contents.map((content, index) => (
          <CardSpotlight className="h-96 w-96 rounded-xl" key={index}>
            <p className="relative z-20 mt-2 text-xl font-bold text-white">
              {content.title}
            </p>
            <div className="relative z-20 mt-4 text-neutral-200">
              {content.description}
              <ul className="mt-2 list-none">
                {content.resons.map((item, index) => (
                  <li
                    key={index}
                    className="flex flex-row items-center gap-2 text-base"
                  >
                    <CheckCircle size={14} className="text-green-500" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <p className="relative z-20 mt-4 text-sm text-neutral-300">
              Ensuring your account is properly secured helps protect your
              personal information and data.
            </p>
          </CardSpotlight>
        ))}
      </div>
    </section>
  );
}
