import { LabjsPage } from './app.po';

describe('labjs App', () => {
  let page: LabjsPage;

  beforeEach(() => {
    page = new LabjsPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
