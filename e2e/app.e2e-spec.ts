import { StockDashboardPage } from './app.po';

describe('stock-dashboard App', () => {
  let page: StockDashboardPage;

  beforeEach(() => {
    page = new StockDashboardPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
