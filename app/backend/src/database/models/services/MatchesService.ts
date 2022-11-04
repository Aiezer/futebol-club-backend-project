import { IMatch, IMatchUp } from '../entities/interfaces/IMatch';
import { MatchesRepository, TeamsRepository } from '../repository';

export default class MatchesService {
  constructor(
    private matchesRepository = new MatchesRepository(),
    private teamsRepository = new TeamsRepository(),
  ) {}

  getAllMatches = async (): Promise<IMatch[]> =>
    this.matchesRepository.getAll();

  getAllMatchesInProgress = async (query: string): Promise<IMatch[]> =>
    this.matchesRepository.getAllInProgress(query);

  createAMatch = async (newMatchRequest: IMatch): Promise<IMatch> => {
    const { homeTeam, awayTeam } = newMatchRequest;

    if (homeTeam === awayTeam) {
      throw new Error(
        '401|It is not possible to create a match with two equal teams',
      );
    }

    const checkHomeTeam = await this.teamsRepository.getById(
      homeTeam as unknown as string,
    );
    const checkAwayTeam = await this.teamsRepository.getById(
      awayTeam as unknown as string,
    );

    if (!checkHomeTeam || !checkAwayTeam) {
      throw new Error('404|There is no team with such id!');
    }

    return this.matchesRepository.createAMatch(newMatchRequest);
  };

  finishAMatch = async (id: string): Promise<void> =>
    this.matchesRepository.finishAMatch(id);

  updateAMatch = async (id: string, matchUpdate: IMatchUp): Promise<void> =>
    this.matchesRepository.updateAMatch(id, matchUpdate);
}
