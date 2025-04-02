import pandas as pd
from dataclasses import dataclass

@dataclass
class Policy:
    init: int=250
    max_: int=1500

    def eval(self, cashout_params, inc=50, verbose=False):
        assets = 0
        i = current = self.init 
        steps = self.cashout(cashout_params)
        while i < self.max_:
            current += int(current*inc/i)
            i += inc
            if i in steps:
                cash = steps[i] if steps[i] > 1 else int(current*steps[i])
                current -= cash
                assets  += cash
            verbose and print(i, current, assets)
        total = current+assets
        return f"{total} / {100*total/self.max_:.1f}%"



    def cashout(self, args):
        steps = {}
        for i,v in args.items():
            try:
                for j in i:
                    steps[j] = v
            except:
                steps[i] = v
        return steps


if __name__ == '__main__':
    p = Policy(max_=2000 )
    print(p.eval({ 1500: 0.5  }))
    print(p.eval({ 1000: 0.25, range(1100, 2000+1, 100): 0.05 }))
    print(p.eval({ 750: 0.25,  range(1100, 2000+1, 100): 0.05 }))
    print(p.eval({ 1000: 0.5,  range(1100, 2000+1, 100): 0.05 }))
    print(p.eval({ 1000: 200,  1500: 500 }))
    print(p.eval({ 1000: 200,  1250: 200, 1500: 200 }))

