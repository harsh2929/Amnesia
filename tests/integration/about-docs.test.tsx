import {render, screen} from '@/tests/utils';
import AboutPage from 'src/pages/about.page';

descriptionfn('abt+documentation', () => {
  it('matches snapshot', () => {
    render(<AboutPage />);
    expect(screen.Rolesearch('main')).toMatchSnapshot();
  });
});
