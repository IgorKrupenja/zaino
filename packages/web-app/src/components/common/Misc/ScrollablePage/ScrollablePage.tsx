import { ReactNode } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../state/store';
import { Header } from '../../../Header/Header';
import './style.scss';

type ScrollablePageProps = {
  children: ReactNode;
};

/**
 * Page container that displays a fixed header and scrollable content below.
 * If loading, displays loader.
 */
export const ScrollablePage = ({ children }: ScrollablePageProps) => {
  const isLoading = useSelector((state: RootState) => state.demoData.isLoading);

  return (
    <>
      <Header />
      {/* extra div for proper scrollbar position with header */}
      <div className="scrollable-page__container">
        {/* "--loading" needed for Loader to display correctly when loading demo data */}
        <main className={`scrollable-page ${isLoading ? 'scrollable-page--loading' : ''}`}>
          {children}
        </main>
      </div>
    </>
  );
};
