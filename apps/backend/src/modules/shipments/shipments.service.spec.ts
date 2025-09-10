import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { ShipmentsService } from './shipments.service';
import { Shipment } from './shipments.entity';

describe('ShipmentsService', () => {
  let service: ShipmentsService;
  let mockRepository: any;

  beforeEach(async () => {
    mockRepository = {
      find: jest.fn(),
      findOne: jest.fn(),
      create: jest.fn(),
      save: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ShipmentsService,
        {
          provide: getRepositoryToken(Shipment),
          useValue: mockRepository,
        },
      ],
    }).compile();

    service = module.get<ShipmentsService>(ShipmentsService);
  });

  describe('findAll', () => {
    it('should return an array of shipments', async () => {
      const mockShipments = [
        { id: '1', trackingNumber: 'TRK001', status: 'IN_TRANSIT' },
        { id: '2', trackingNumber: 'TRK002', status: 'DELIVERED' },
      ];

      mockRepository.find.mockResolvedValue(mockShipments);

      const result = await service.findAll();

      expect(result).toEqual(mockShipments);
      expect(mockRepository.find).toHaveBeenCalled();
    });
  });

  describe('findOne', () => {
    it('should return a single shipment', async () => {
      const mockShipment = { id: '1', trackingNumber: 'TRK001', status: 'IN_TRANSIT' };

      mockRepository.findOne.mockResolvedValue(mockShipment);

      const result = await service.findOne('1');

      expect(result).toEqual(mockShipment);
      expect(mockRepository.findOne).toHaveBeenCalledWith({ where: { id: '1' } });
    });
  });

  describe('create', () => {
    it('should create and return a new shipment', async () => {
      const createShipmentDto = {
        trackingNumber: 'TRK003',
        origin: { address: 'Origin' },
        destination: { address: 'Destination' },
      };

      const mockShipment = { id: '3', ...createShipmentDto, status: 'PENDING' };

      mockRepository.create.mockReturnValue(mockShipment);
      mockRepository.save.mockResolvedValue(mockShipment);

      const result = await service.create(createShipmentDto);

      expect(result).toEqual(mockShipment);
      expect(mockRepository.create).toHaveBeenCalledWith(createShipmentDto);
      expect(mockRepository.save).toHaveBeenCalledWith(mockShipment);
    });
  });
});