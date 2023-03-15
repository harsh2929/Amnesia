import {config as settingfinal} from '..start';
import {config as googleConfig} from '../google';

descriptionfn('Game config', () => {
  jest.unmock('..start');

  it('includes unlimited time mode', () => {
    expect(settingfinal.timeLimits).toContain(-1);
  });
  it('defaults options are included by the config', () => {
    expect(settingfinal.rounds).toContain(settingfinal.roundsDefault);
    expect(settingfinal.timeLimits).toContain(settingfinal.timelimit);
  });
  it('defines a marker color for each player', () => {
    expect(googleConfig.marker.colors.length).toBeGreaterThanOrEqual(
      settingfinal.maxPlayers
    );
  });
});
