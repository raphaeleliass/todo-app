import { InfiniteMovingCards } from "@/components/ui/infinite-moving-cards";

export default function Testimonials() {
  const testimonials = [
    {
      quote:
        "This todo app completely transformed how I organize my daily tasks. I've become so much more productive since I started using it!",
      name: "Sarah Johnson",
      title: "Marketing Professional",
    },
    {
      quote:
        "I used to forget important deadlines, but now everything is perfectly organized. The simple interface makes task management a breeze.",
      name: "Michael Chen",
      title: "Software Engineer",
    },
    {
      quote:
        "As a busy mom, this app helps me keep track of both work and family tasks. It's been a game-changer for my work-life balance.",
      name: "Emily Roberts",
      title: "Business Owner",
    },
    {
      quote:
        "The reminders feature has made me so much more reliable. I never miss important tasks anymore!",
      name: "David Wilson",
      title: "Project Manager",
    },
    {
      quote:
        "Simple, efficient, and exactly what I needed. This todo app has helped me achieve my goals one task at a time.",
      name: "Lisa Thompson",
      title: "Freelance Designer",
    },
    {
      quote:
        "I've tried many todo apps, but this one stands out. The user interface is intuitive and it has all the features I need.",
      name: "James Anderson",
      title: "Student",
    },
    {
      quote:
        "Thanks to this app, I've developed better habits and improved my time management skills significantly.",
      name: "Rachel Martinez",
      title: "Healthcare Professional",
    },
  ];

  return (
    <section className="container mt-32 flex flex-col items-center justify-center">
      <h2>Still deciding?</h2>
      <p>See what our users are saying.</p>
      <div className="mt-12">
        <InfiniteMovingCards
          items={testimonials}
          direction="right"
          pauseOnHover
          speed="slow"
        />
      </div>
    </section>
  );
}
