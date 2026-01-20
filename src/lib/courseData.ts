export interface Course {
  id: string;
  code: string;
  title: string;
  description: string;
  locked: boolean;
}

export const courses: Course[] = [
  {
    id: 'igcse-0580',
    code: '0580',
    title: 'IGCSE Mathematics',
    description: 'Cambridge IGCSE Mathematics (0580)',
    locked: false
  },
  {
    id: 'olevel-4024',
    code: '4024',
    title: 'O Level Mathematics',
    description: 'Cambridge O Level Mathematics (4024)',
    locked: true
  }
];

export function getCourse(id: string): Course | undefined {
  return courses.find(c => c.id === id);
}
