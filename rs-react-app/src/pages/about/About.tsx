export const About = () => {
  return (
    <div>
      <h3 className="mt-8 mb-4 font-bold text-xl mask-radial-from-neutral-200 tracking-wider">
        About me
      </h3>
      <p>
        Hi! My name is Sasha. I have been interested in programming for several
        years and started my journey from the zero stage at RS School. Things
        have become a bit challenging lately — summer, sunshine, and some
        Tailwind issues have made it hard to create a fully styled and
        functional page. But I am not giving up! I hope to catch up and improve
        everything when the colder days come. 😊
      </p>
      <p>
        Created as part of the{' '}
        <a
          href="https://rs.school/courses/reactjs"
          className="text-amber-800 underline"
        >
          RS School React course
        </a>
      </p>
    </div>
  );
};
