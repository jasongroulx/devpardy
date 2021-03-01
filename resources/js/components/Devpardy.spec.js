import Devpardy from './Devpardy.vue'
import { render } from '@testing-library/vue';

describe('Devpardy', () => {
  it('passes the sanity check', () => {
    expect(true).toBeTruthy();
  });


  it('should mount component', () => {
    const { getByText} = render(Devpardy)
    getByText('Devpardy')
  });
});
