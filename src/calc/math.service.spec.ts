import { Test, TestingModule } from '@nestjs/testing';
import { MathService } from './math.service';

describe('CalcService', () => {
  let service: MathService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MathService],
    }).compile();

    service = module.get<MathService>(MathService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  test('2-2=0', () => {
    expect(service.substraction("2", "2")).toBe("0");
  });

  test('3*3=9', () => {
    expect(service.multiplication("3", "3")).toBe("9");
  });

  test('2+2=4', () => {
    expect(service.addition("2", "2")).toBe("4");
  });

  test('12/4=3', () => {
    expect(service.division("12", "4")).toBe("3");
  });

  // to test float number, unsuported properly by valilla.js
  test('10-0.5=9.5', () => {
    expect(service.substraction("10", "0.5")).toBe("9.5");
  });

  test('Should return func addition', () => {
    expect(service.getMathFunction("addition")).toBe(service.addition);
  });

  test('Should return func substraction', () => {
    expect(service.getMathFunction("substraction")).toBe(service.substraction);
  });

  test('Should return func multiplication', () => {
    expect(service.getMathFunction("multiplication")).toBe(service.multiplication);
  });

  test('Should return func division', () => {
    expect(service.getMathFunction("division")).toBe(service.division);
  });
});
