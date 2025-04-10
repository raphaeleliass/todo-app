import { AnimatedTooltip } from "@/components/ui/animated-tooltip";

export default function Cta() {
  const peoples = [
    {
      id: 1,
      name: "John Doe",
      designation: "Software Engineer",
      image:
        "https://images.unsplash.com/photo-1599566150163-29194dcaad36?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3387&q=80",
    },
    {
      id: 2,
      name: "Robert Johnson",
      designation: "Product Manager",
      image:
        "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YXZhdGFyfGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60",
    },
    {
      id: 3,
      name: "Jane Smith",
      designation: "Data Scientist",
      image:
        "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8YXZhdGFyfGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60",
    },
    {
      id: 4,
      name: "Emily Davis",
      designation: "UX Designer",
      image:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGF2YXRhcnxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60",
    },
    {
      id: 5,
      name: "Tyler Durden",
      designation: "Soap Developer",
      image:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3540&q=80",
    },
    {
      id: 6,
      name: "Dora",
      designation: "The Explorer",
      image:
        "https://images.unsplash.com/photo-1544725176-7c40e5a71c5e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3534&q=80",
    },
  ];

  return (
    <section className="mt-12 place-content-center justify-items-center py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="flex w-full flex-col items-center justify-center text-center">
          <div className="mb-12 max-w-2xl space-y-4">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Join People Embracing Productivity
            </h2>
            <p className="text-lg text-muted-foreground">
              Become part of a growing community focused on achieving more,
              together.
            </p>
          </div>
          <div className="flex w-full flex-col items-center justify-center gap-10 md:flex-row md:justify-around">
            <div className="flex flex-col items-start gap-2">
              <div className="flex flex-row">
                <AnimatedTooltip items={peoples} />
              </div>
              <div className="flex flex-row gap-2">
                <div className="flex flex-col items-center lg:items-start">
                  <p className="text-4xl font-semibold text-primary">20k+</p>
                  <p className="max-w-32 text-center text-base font-semibold text-primary md:text-left">
                    People have already joined.
                  </p>
                </div>
                <div className="flex flex-col items-center lg:items-start">
                  <p className="text-4xl font-semibold text-primary">99%</p>
                  <p className="max-w-32 text-center text-base font-semibold text-primary md:text-left">
                    Happy customers.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
