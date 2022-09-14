import {StageApiService} from "./StageApiService";

describe('StageApiService', () => {
    it('calls fetch when getting stages',  async () => {
        fetch = jest.fn().mockReturnValue({
            ok: true,
            status: 200,
            json: async () => 5
        })
        const response =  await StageApiService.getStages()
        expect(fetch).toHaveBeenCalledWith(
            "http://localhost:8000/api/stages"
        )
        expect(response).toBe(5)
    })
})