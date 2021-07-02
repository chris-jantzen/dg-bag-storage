import { Test, TestingModule } from '@nestjs/testing';
import { BagService } from './bag.service';
import { Bag, BagDocument, BagSchema } from './bag.schema';
import { model, Model } from 'mongoose';
import { getModelToken } from '@nestjs/mongoose';

describe('BagService', () => {
  let service: BagService;
  let mockBagModel: Model<BagDocument>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: getModelToken(Bag.name),
          useValue: model('bag', BagSchema),
        },
      ],
    }).compile();

    mockBagModel = module.get<Model<BagDocument>>(getModelToken(Bag.name));
    service = module.get<BagService>(BagService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create bag', async () => {
    const bag = new Bag();

    const spy = jest
      .spyOn(mockBagModel, 'create')
      .mockResolvedValue(bag as BagDocument);

    await service.create(bag);
    expect(spy).toBeCalled();
  });
});
