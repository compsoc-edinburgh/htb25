import { ReactNode } from "react";

interface FAQItem {
  question: string;
  answer: ReactNode;
}

const FAQ_ITEMS = [
  {
    question: "When do applications close?",
    answer: (
      <>
        Applications will close on the <b>10th Feb</b>.
      </>
    ),
  },
  {
    question: "When will I hear back on my application?",
    answer: (
      <>
        We aim to get back to you on your application by the <b>17th Feb</b>.
      </>
    ),
  },
  {
    question: "How many people are allowed on a team?",
    answer: (
      <>
        A minimum of <b>4</b> people are required to form a team, however teams
        of up to <b>6</b> people are allowed.
      </>
    ),
  },
  {
    question: "Who can attend?",
    answer: (
      <>
        To be eligible to participate, you only have to be a{" "}
        <b>current student</b> from any university, or have{" "}
        <b>graduated within a year</b>! We encourage anyone from any degree
        discipline, technical or not, to enjoy HackTheBurgh and show off your
        skills throughout the weekend. Unfortunately, due to logistical and
        legal constraints, we are unable to host under 18s.
      </>
    ),
  },
  {
    question: "How will our applications be judged?",
    answer: (
      <>
        We evaluate applications based on technical merit demonstrated through
        your CV, Github, and application responses, with consideration given to
        your year of study.
      </>
    ),
  },
  {
    question: "What if I don’t have a team?",
    answer: (
      <>
        Don't worry, we'll have a Discord channel for participants to form teams
        before the event. You can also form a team when you arrive on the day.
      </>
    ),
  },
  {
    question:
      "What is the difference between applying individually or as a team?",
    answer: (
      <>
        If you apply as a team, you will be judged as a team and either{" "}
        <u>all of you will be accepted or none of you will be</u>. If you apply
        individually, you will be judged individually and accepted individually;
        you can then form a team on the day or on Discord.
      </>
    ),
  },
  {
    question: "Do I need loads of experience to participate?",
    answer: (
      <>
        Not at all. Whether you’re a first year student, study a subject
        unrelated to computing, or this is your first Hackathon, you are still
        welcome to enter HackTheBurgh. This is a great opportunity to learn and
        gain new experience!
      </>
    ),
  },
  {
    question: "What am I supposed to build / hack during the weekend?",
    answer: (
      <>
        You have complete freedom in what you build at our hackathon! Don't
        worry about making your hack polished or perfect - we know there's
        limited time. We hope HackTheBurgh serves as a launchpad for you to
        start a project you can continue working on even after the event ends.
      </>
    ),
  },
  {
    question: "What time does HTB start and end?",
    answer: (
      <>
        HTB runs on the weekend of the <b>1st-2nd March</b>. Registration starts
        from 9:00 on the Saturday and our closing ceremony concludes at 17:00 on
        the Sunday.
      </>
    ),
  },
  {
    question: "What about food?",
    answer: (
      <>
        We’ll provide food, snacks and drinks through the day. We will ask you
        about any dietary restrictions and share the food options available from
        our vendors after you’ve been accepted into the event.
      </>
    ),
  },
  {
    question: "What should I bring?",
    answer: <>Valid student ID, laptop, charger.</>,
  },
  {
    question: "What if I have any other questions?",
    answer: (
      <>
        Contact us at{" "}
        <a href="mailto:hello@hacktheburgh.com">hello@hacktheburgh.com</a>
      </>
    ),
  },
];

const FAQAccordionItem = ({ faq }: { faq: FAQItem }) => {
  return (
    <details className="group mb-4 rounded-lg bg-white p-4 shadow-md">
      <summary className="flex cursor-pointer items-center justify-between text-base font-medium text-black md:text-xl lg:text-2xl">
        <span className="w-3/4">{faq.question}</span>
        <span className="flex h-9 w-9 items-center justify-center rounded-full bg-purple-200">
          <span className="text-purple-500 transition-transform duration-200 group-open:rotate-180">
            ▲
          </span>
        </span>
      </summary>
      <p className="mt-2 text-sm text-black md:text-base lg:text-lg">
        {faq.answer}
      </p>
    </details>
  );
};

export const FAQComponents = {
  FAQAccordionItem,
  FAQ_ITEMS,
} as const;
