import { DelegateNetwork, DelegateFarmConfig } from './types';

const DelegateFarms : DelegateFarmConfig[] = [
 {
     pid : 4, // pool id si
     tokenSymbol : 'CST',
     delegateToken : DelegateNetwork.BNB,
     isActive : true,
     lpSymbol : 'CST',
     depositFee : 3,
     delegateAddress : 'CST',
     multiplier : '30x'
 },
 
];

export default DelegateFarms;
