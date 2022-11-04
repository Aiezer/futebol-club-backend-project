import { IMatch } from '../entities/interfaces/IMatch';
import { MatchesRepository } from '../repository';

export default class MatchesService {
  constructor(private matchesRepository = new MatchesRepository()) {}

  getAllMatches = async ():Promise<IMatch[]> => this.matchesRepository.getAll();
}
