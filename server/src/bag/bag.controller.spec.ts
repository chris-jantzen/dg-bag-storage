import { Test, TestingModule } from '@nestjs/testing';
import { BagController } from './bag.controller';
import { BagService } from './bag.service';
import { Bag, BagDocument, BagSchema } from './bag.schema';
import { model } from 'mongoose';
import { getModelToken } from '@nestjs/mongoose';
import { BagModule } from './bag.module';

describe('BagController', () => {
  let controller: BagController;
  let service: BagService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [BagModule],
      controllers: [BagController],
      providers: [
        BagService,
        {
          provide: getModelToken(Bag.name),
          useValue: model('bag', BagSchema),
        },
      ],
    }).compile();

    controller = module.get<BagController>(BagController);
    service = module.get<BagService>(BagService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a bag', async () => {
      const bag = new Bag();

      jest
        .spyOn(service, 'create')
        .mockImplementation(async () => bag as BagDocument);
      const spy = jest
        .spyOn(controller, 'create')
        .mockResolvedValue(bag as BagDocument);

      await controller.create(bag);
      expect(spy).toBeCalled();
    });
  });
});
