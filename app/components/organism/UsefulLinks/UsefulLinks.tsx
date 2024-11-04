// components/UsefulLinks.tsx
import Link from "next/link";

// Define the type for each link
type UsefulLink = {
  title: string;
  href: string;
};

// Define the array with type annotations
const usefulLinks: UsefulLink[] = [
  {
    title: "Google TypeScript Coding Style Guide",
    href: "https://google.github.io/styleguide/tsguide.html",
  },
  {
    title: "TypeScript Documentation",
    href: "https://www.typescriptlang.org/docs/",
  },
  {
    title: "TypeScript Deep Dive by Basarat Ali Syed",
    href: "https://basarat.gitbook.io/typescript/",
  },
  {
    title: "JavaScript Info: The Modern JavaScript Tutorial",
    href: "https://javascript.info/",
  },
  {
    title: "ECMAScript Specification",
    href: "https://tc39.es/ecma262/",
  },
  {
    title: "MDN Web Docs - JavaScript",
    href: "https://developer.mozilla.org/en-US/docs/Web/JavaScript",
  },
  {
    title: "TypeScript ESLint: TypeScript support for ESLint",
    href: "https://typescript-eslint.io/",
  },
  {
    title: "React TypeScript Cheatsheet",
    href: "https://react-typescript-cheatsheet.netlify.app/",
  },
  {
    title: "Node.js Documentation",
    href: "https://nodejs.org/en/docs/",
  },
  {
    title: "Webpack Documentation",
    href: "https://webpack.js.org/concepts/",
  },
  {
    title: "Babel Documentation",
    href: "https://babeljs.io/docs/en/",
  },
  {
    title: "Axios Documentation",
    href: "https://axios-http.com/docs/intro",
  },
  {
    title: "Jest Documentation",
    href: "https://jestjs.io/docs/getting-started",
  },
  {
    title: "React Hook Form Documentation",
    href: "https://react-hook-form.com/",
  },
  // Websites to stay updated with trends
  {
    title: "Smashing Magazine",
    href: "https://www.smashingmagazine.com/",
  },
  {
    title: "CSS-Tricks",
    href: "https://css-tricks.com/",
  },
  {
    title: "Dev.to",
    href: "https://dev.to/",
  },
  {
    title: "Hacker News",
    href: "https://news.ycombinator.com/",
  },
  {
    title: "Medium",
    href: "https://medium.com/",
  },
  {
    title: "GitHub Blog",
    href: "https://github.blog/",
  },
  {
    title: "Stack Overflow Blog",
    href: "https://stackoverflow.blog/",
  },
  {
    title: "JavaScript Weekly",
    href: "https://javascriptweekly.com/",
  },
  {
    title: "Frontend Weekly",
    href: "https://frontendweekly.com/",
  },
  {
    title: "Web.dev",
    href: "https://web.dev/",
  },
  {
    title: "Google Developers Blog",
    href: "https://developers.googleblog.com/",
  },
  {
    title: "A List Apart",
    href: "https://alistapart.com/",
  },
  {
    title: "W3C Blog",
    href: "https://www.w3.org/blog/",
  },
  {
    title: "MDN Web Docs",
    href: "https://developer.mozilla.org/en-US/",
  },
];

const UsefulLinks: React.FC = () => {
  return (
    <div className="p-4 bg-gray-100 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">Useful Links</h2>
      <ul className="space-y-2">
        {usefulLinks.map((link, index) => (
          <li key={index}>
            <Link
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 hover:text-blue-700 transition-colors duration-200"
            >
              {link.title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UsefulLinks;
