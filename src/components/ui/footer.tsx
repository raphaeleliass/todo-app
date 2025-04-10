import React from "react";
import { Button } from "./button";

export default function Footer() {
  const currDate = new Date().getFullYear();

  return (
    <footer className="flex flex-row items-center justify-between bg-secondary px-4 py-6 text-sm">
      <p>{currDate} &copy; Todo app</p>

      <div className="flex flex-row gap-1">
        {["facebook", "instagram", "whatsapp"].map((item, index) => (
          <Button variant={"link"} key={index}>
            {item}
          </Button>
        ))}
      </div>
    </footer>
  );
}
