const ENDPOINT = 'https://test-task.shtrafovnet.com';

//* Работает только с 18810136191111001035 и 0356043010119111100023005
export default async function getFine(uin, setLoading) {
    setLoading(true);
    const req = await fetch(ENDPOINT + '/fines/' + uin.toString());
    const resp = req.ok ? req.json() : 'error';
    setLoading(false);
    return resp
}