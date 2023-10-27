import { marked } from 'marked';

interface Section {
  title: string;
  content: string;
}

export function parseContent(markdown: string): Section[] {
  const regex: RegExp = /\n\n(\d+\. ### [^\n]+)/g;
  const sections: Section[] = [];
  let lastMatchEnd: number = 0;
  let lastMatchedString: string | null = null;

  let match: RegExpExecArray | null;
  while ((match = regex.exec(markdown)) !== null) {
    if (lastMatchedString !== null) {
      const sectionContent: string = markdown
        .substring(lastMatchEnd, match.index)
        //.replace(/^\s*\[⬆ Back to Top\].*$/gm, '')
        .trim();

      if (sectionContent) {
        sections.push({
          title: lastMatchedString.replace(/###\s*/, '').trim(),
          content: marked(sectionContent),
        });
      }
    }
    lastMatchedString = match[1];
    lastMatchEnd = regex.lastIndex;
  }

  if (lastMatchedString !== null) {
    const lastSection: string = markdown
      .substring(lastMatchEnd)
      //.replace(/^\s*\[⬆ Back to Top\].*$/gm, '')
      .trim();

    if (lastSection) {
      sections.push({
        title: lastMatchedString.replace(/###\s*/, '').trim(),
        content: marked(lastSection),
      });
    }
  }

  return sections;
}
