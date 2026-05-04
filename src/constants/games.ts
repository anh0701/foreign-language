import { 
  Target, 
  BrainCircuit, 
  Shapes, 
  Layers, 
  BookOpen,
  type LucideIcon
} from 'lucide-react';

export interface GameInfo {
  id: string;
  title: string;
  description: string;
  path: string;
  Icon: LucideIcon;
  color: string;
}

export const GAMES: GameInfo[] = [
  {
    id: 'word-combination',
    title: 'Ghép chữ',
    description: 'Sắp xếp các chữ cái để hoàn thiện từ vựng chính xác.',
    path: '/word-combination',
    Icon: Target,
    color: 'text-blue-600'
  },
  {
    id: 'fill-in',
    title: 'Điền từ',
    description: 'Chọn hoặc viết từ phù hợp để hoàn thành câu văn.',
    path: '/fill-in',
    Icon: BrainCircuit,
    color: 'text-purple-600'
  },
  {
    id: 'matching',
    title: 'Nối từ',
    description: 'Nối các cặp từ vựng với ý nghĩa tương ứng của chúng.',
    path: '/matching',
    Icon: Shapes,
    color: 'text-orange-500'
  },
  {
    id: 'flashcards',
    title: 'Flashcard',
    description: 'Luyện tập trí nhớ phản xạ với bộ thẻ từ vựng.',
    path: '/flashcards',
    Icon: Layers,
    color: 'text-emerald-600'
  },
  {
    id: 'short-stories',
    title: 'Truyện ngắn',
    description: 'Đọc và học từ vựng thông qua các câu chuyện thú vị.',
    path: '/short-stories',
    Icon: BookOpen,
    color: 'text-rose-500'
  }
];