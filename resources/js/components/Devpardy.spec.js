import Devpardy from './Devpardy.vue'
import { render } from '@testing-library/vue';

describe('Devpardy', () => {
  it('passes the sanity check', () => {
    expect(true).toBeTruthy();
  });


  it('should mount component', () => {
    const { getByText} = render(Devpardy, {
      props: {
        topics: {
          Vim: {
            100: {
              completed: false,
              difficulty: 100,
              id: 'random-id',
              question: 'What is this',
              topic: 'Vim'
            }
          }
        }
      }
    })
    getByText('Vim')
  });
});
