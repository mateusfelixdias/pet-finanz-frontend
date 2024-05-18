import classNames from 'classnames';
import { Link, useLocation } from 'react-router-dom';
import { Cat, House, Money, ShoppingCart } from 'phosphor-react';

interface Props {
  isOpen: boolean;
}

export default function Sidebar({ isOpen }: Props) {
  const location = useLocation();
  const isScreenCart = location.pathname === '/cart';
  const isScreenHome = location.pathname === '/home';
  const isScreenFinancialControl = location.pathname === '/financial-control';

  return (
    <div
      className={classNames(
        'bg-secondary w-72 min-h-screen border-r-2 border-r-gray-200 text-center',
        { hidden: !isOpen }
      )}
    >
      <div className="mt-5 flex items-center justify-center gap-1">
        <Cat size={24} />
        <strong className="text-xl">Petz</strong>
      </div>

      <div className="mt-10 ml-5">
        <div className="flex flex-col gap-4">
          <Link
            to="/home"
            className={classNames(
              'flex items-center gap-2 text-center hover:text-gray-500',
              isScreenHome ? 'text-gray-500' : ''
            )}
          >
            <House size={24} />
            <span className="font-semibold">Home</span>
          </Link>

          <Link
            to="/cart"
            className={classNames(
              'flex items-center gap-2 text-center hover:text-gray-500',
              isScreenCart ? 'text-gray-500' : ''
            )}
          >
            <ShoppingCart size={24} />
            <span className="font-semibold">Carrinho</span>
          </Link>

          <Link
            to="/financial-control"
            className={classNames(
              'flex items-center gap-2 text-center hover:text-gray-500',
              isScreenFinancialControl ? 'text-gray-500' : ''
            )}
          >
            <Money size={24} />
            <span className="font-semibold">Financeiro</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
