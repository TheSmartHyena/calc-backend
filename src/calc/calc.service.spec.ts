import { HttpException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { CalcService } from './calc.service';
import { MathService } from './math.service';

describe('CalcService', () => {
    let service: CalcService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
        providers: [CalcService, MathService],
        }).compile();

        service = module.get<CalcService>(CalcService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });

    it('should parse 2+2', () => {
        expect(service.parse("2+2")).toEqual({"calculus": "2+2", "items": ["2", {"name": "addition", "priority": 1, "value": "+"}, "2"]});
    });

    it('should parse 2-2', () => {
        expect(service.parse("2-2")).toEqual({"calculus": "2-2", "items": ["2", {"name": "substraction", "priority": 1, "value": "-"}, "2"]});
    });

    it('should parse 3*3', () => {
        expect(service.parse("3*3")).toEqual({"calculus": "3*3", "items": ["3", {"name": "multiplication", "priority": 2, "value": "*"}, "3"]});
    });

    it('should parse 12/4', () => {
        expect(service.parse("12/4")).toEqual({"calculus": "12/4", "items": ["12", {"name": "division", "priority": 2, "value": "/"}, "4"]});
    });

    it('should parse 1+2-3*4/5', () => {
        expect(service.parse("1+2-3*4/5")).toEqual({"calculus": "1+2-3*4/5","items": ["1",{"value": "+","priority": 1,"name": "addition"},"2",{"value": "-","priority": 1,"name": "substraction"},"3",{"value": "*","priority": 2,"name": "multiplication"},"4",{"value": "/","priority": 2,"name": "division"},"5"]});
    })

    it('should parse 42-36.30', () => {
        expect(service.parse("42-36.30")).toEqual({"calculus": "42-36.30","items": ["42",{"value": "-","priority": 1,"name": "substraction"},"36.30"]});
    })

    it('should parse 1.1+2.2-3.3*4.4/5.5', () => {
        expect(service.parse("1.1+2.2-3.3*4.4/5.5")).toEqual({"calculus":"1.1+2.2-3.3*4.4/5.5","items":["1.1",{"value":"+","priority":1,"name":"addition"},"2.2",{"value":"-","priority":1,"name":"substraction"},"3.3",{"value":"*","priority":2,"name":"multiplication"},"4.4",{"value":"/","priority":2,"name":"division"},"5.5"]});
    })

    // errors
    it('should not parse 2++2', () => {
        expect.assertions(2);
        try {
            service.parse("2++2");
        } catch (e) {
            expect(e).toBeInstanceOf(HttpException);
            expect(e.message).toBe("An error occured during the execution of the calculus: two dots, two operators, or dot/operator can't be after one dot/operator: 2++2");
        }
    })

    it('should not parse 2..2', () => {
        expect.assertions(2);
        try {
            service.parse("2..2");
        } catch (e) {
            expect(e).toBeInstanceOf(HttpException);
            expect(e.message).toBe("An error occured during the execution of the calculus: two dots, two operators, or dot/operator can't be after one dot/operator: 2..2");
        }
    })

    it('should not parse 2.2.2+2', () => {
        expect.assertions(2);
        try {
            service.parse("2.2.2+2");
        } catch (e) {
            expect(e).toBeInstanceOf(HttpException);
            expect(e.message).toBe("An error occured during the execution of the calculus: an item can't have two dots: 2.2.2+2");
        }
    })

    it('should not parse +2+2', () => {
        expect.assertions(2);
        try {
            service.parse("+2+2");
        } catch (e) {
            expect(e).toBeInstanceOf(HttpException);
            expect(e.message).toBe("An error occured during the execution of the calculus: can't start with dot or operator: +2+2");
        }
    })

    it('should not parse 2+2+', () => {
        expect.assertions(2);
        try {
            service.parse("2+2+");
        } catch (e) {
            expect(e).toBeInstanceOf(HttpException);
            expect(e.message).toBe("An error occured during the execution of the calculus: can't end with dot or operator: 2+2+");
        }
    })

    it('should not parse .2+2', () => {
        expect.assertions(2);
        try {
            service.parse(".2+2");
        } catch (e) {
            expect(e).toBeInstanceOf(HttpException);
            expect(e.message).toBe("An error occured during the execution of the calculus: can't start with dot or operator: .2+2");
        }
    })

    it('should not parse 2+2.', () => {
        expect.assertions(2);
        try {
            service.parse("2+2.");
        } catch (e) {
            expect(e).toBeInstanceOf(HttpException);
            expect(e.message).toBe("An error occured during the execution of the calculus: can't end with dot or operator: 2+2.");
        }
    })

    it('should not parse 2+ 2', () => {
        expect.assertions(2);
        try {
            service.parse("2+ 2");
        } catch (e) {
            expect(e).toBeInstanceOf(HttpException);
            expect(e.message).toBe("An error occured during the execution of the calculus: can't contain any white-space: 2+ 2");
        }
    })

    it('should not parse 2_2', () => {
        expect.assertions(2);
        try {
            service.parse("2_2");
        } catch (e) {
            expect(e).toBeInstanceOf(HttpException);
            expect(e.message).toBe("An error occured during the execution of the calculus: un-recognised charater: 2_2");
        }
    })

    it('should parse -1.1+-2.2--3.3*-4.4/-5.5', () => {
        expect(service.parse("-1.1+-2.2--3.3*-4.4/-5.5")).toEqual({"calculus":"-1.1+-2.2--3.3*-4.4/-5.5","items":["-1.1",{"value":"+","priority":1,"name":"addition"},"-2.2",{"value":"-","priority":1,"name":"substraction"},"-3.3",{"value":"*","priority":2,"name":"multiplication"},"-4.4",{"value":"/","priority":2,"name":"division"},"-5.5"]});
    })

});
