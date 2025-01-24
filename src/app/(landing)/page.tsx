import { LandingCard } from "~/components/modules/landing";

const FAQ_ITEMS = [
  {
    question: "When do applications close?",
    answer: "Applications will close on the 10th Feb.",
  },
  {
    question: "When will I hear back on my application?",
    answer: "We aim to get back to you on your application by the 17th Feb.",
  },
  {
    question: "What if I don’t have a team?",
    answer: "Don't worry, we'll have a Discord channel for participants to form teams before the event. You can also form a team when you arrive on the day. **Being in a team does not affect your chances of being accepted into the event.**",
  },
  {
    question: "How many people are allowed on a team?",
    answer: "A minimum of 4 people are required to form a team, however teams of up to 6 people are allowed.",
  },
  {
    question: "Who can attend?",
    answer: "To be eligible to participate, you only have to be a current student from any university, or have graduated within a year! We encourage anyone from any degree discipline, technical or not, to enjoy HackTheBurgh and show off your skills throughout the weekend. Unfortunately, due to logistical and legal constraints, we are unable to host under 18s.",
  },
  {
    question: "How will our applications be judged?",
    answer: "We evaluate applications based on technical merit demonstrated through your CV, Github, and application responses, with consideration given to your year of study.",
  },
  {
    question: "Do I need loads of experience to participate?",
    answer: "Not at all. Whether you’re a first year student, study a subject unrelated to computing, or this is your first Hackathon, you are still welcome to enter HackTheBurgh. This is a great opportunity to learn and gain new experience!",
  },
  {
    question: "What am I supposed to build / hack during the weekend?",
    answer: "You have complete freedom in what you build at our hackathon! Don't worry about making your hack polished or perfect - we know there's limited time. We hope HackTheBurgh serves as a launchpad for you to start a project you can continue working on even after the event ends.",
  },
  {
    question: "What time does HTB start and end?",
    answer: "HTB runs on the weekend of the 1st-2nd March. Registration starts from 9:00 on the Saturday and our closing ceremony concludes at 17:00 on the Sunday.",
  },
  {
    question: "What about food?",
    answer: "We’ll provide food, snacks and drinks through the day. We will ask you about any dietary restrictions and share the food options available from our vendors after you’ve been accepted into the event.",
  },
  {
    question: "What should I bring?",
    answer: "Valid student ID, laptop, charger.",
  },
  {
    question: "What if I have any other questions?",
    answer: "Contact us at [hello@hacktheburgh.com](mailto:hello@hacktheburgh.com)",
  },
];

export default function Page() {
  return (
    <main className="mx-4 w-full space-y-8 pb-8 md:mx-10">
      <div className="mx-4 my-12 flex flex-col items-center text-center lg:mx-32 lg:my-26">
        <img src="/htb-logo.png" alt="HTB Logo" className="h-full w-full" />
      </div>

      <div className="grid gap-4 grid-cols-1 md:grid-cols-3 lg:grid-cols-6">
        <div className="col-span-1 order-2 md:col-span-3 lg:order-none lg:col-span-2">
          <LandingCard.CodeCard />
        </div>
        <div className="col-span-1 order-0 md:col-span-2 lg:order-none lg:col-span-3">
          <LandingCard.WelcomeCard />
        </div>
        <div className="order-1 lg:order-none">
          <LandingCard.RegisterCard />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <LandingCard.CountdownCard />
        <LandingCard.VolunteerCard />
      </div>

      {/* Updated FAQ Section */}
      <section className="mt-16 w-full max-w-3xl mx-auto text-left p-6 rounded-lg bg-[#DAFE51] border-2 border-yellow-500 shadow-lg">
        <h2 className="mb-8 text-center text-3xl font-bold text-black">
          You have questions, we have answers!
        </h2>
        <div className="grid grid-cols-1 gap-4">
          {FAQ_ITEMS.map((faq, index) => (
            <details
              key={index}
              className="mb-4 rounded-lg bg-white p-4 group shadow-md"
            >
              <summary className="flex items-center justify-between text-xl font-medium text-black cursor-pointer">
                <span>{faq.question}</span>
                <span className="ml-2 flex items-center justify-center w-8 h-8 bg-purple-200 rounded-full">
                  <span className="text-purple-500 transition-transform duration-200 group-open:rotate-180">
                    ▲
                  </span>
                </span>
              </summary>
              <p className="mt-2 text-black">{faq.answer}</p>
            </details>
          ))}
        </div>
      </section>
    </main>
  );
}