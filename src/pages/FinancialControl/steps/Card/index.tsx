import { CardData } from '@/types/CardData';

export default function Card({ Icon, name, total }: CardData) {
  return (
    <div className="w-full h-auto bg-secondary rounded-md transition-transform transform-gpu hover:-translate-y-2 hover:shadow-md">
      <div className="flex flex-col gap-1 m-6">
        <div className="flex items-center justify-center w-16 h-16 bg-secondary rounded-md border">
          <Icon size={40} />
        </div>

        <span className="font-semibold">{name}</span>
        <span className="font-semibold">{total}</span>
      </div>
    </div>
  );
}
