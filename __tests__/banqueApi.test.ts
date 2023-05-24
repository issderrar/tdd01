import BanqueApi from "../src/classes/banqueApi";
describe('banqueApi class', () => {

    it('should return false if client is not blacklisted', function () {
        const banqueApi = new BanqueApi();
        const notBlacklistedClientId = 1;

        expect(banqueApi.getClientStatus(notBlacklistedClientId)).toBe(false);
    });

    it('When i add somebody to blacklist, it should returns as blacklisted', function () {
        const banqueApi = new BanqueApi();
        const notBlacklistedClientId = 9000;

        expect(banqueApi.getClientStatus(notBlacklistedClientId)).toBe(false);

        banqueApi.addClientToBlacklist(notBlacklistedClientId);

        expect(banqueApi.getClientStatus(notBlacklistedClientId)).toBe(true);

    });
})
