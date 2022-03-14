import React from 'react'
import { Text } from '@macist-m/robinia-uikit'
import BigNumber from 'bignumber.js/bignumber'
import { getBalanceNumber } from 'utils/formatBalance'
import { useTotalSupply, useBurnedBalance } from 'hooks/useTokenBalance'
import { BLOCKS_PER_YEAR} from 'config'
import { getCakeAddress } from 'utils/addressHelpers'
import { QuoteToken } from 'config/constants/types'
import CardValue from './CardValue'
import { useFarms, usePriceCakeBusd, useTotalValue ,usePriceBnbBusd,usePriceEthBnb} from '../../../state/hooks'


const CakeStats = () => {
  const totalValue = useTotalValue()
  const totalSupply = useTotalSupply()
  const burnedBalance = useBurnedBalance(getCakeAddress())
  const farms = useFarms()
  const eggPrice = usePriceCakeBusd()
  const bnbPrice = usePriceBnbBusd()
  const EthPrice = usePriceEthBnb()
  const circSupply = totalSupply ? totalSupply.minus(burnedBalance) : new BigNumber(0)
  const cakeSupply = getBalanceNumber(circSupply)
  const marketCap = eggPrice.times(circSupply)
  let eggPerBlock = 0
  if (farms && farms[0] && farms[0].eggPerBlock) {
    eggPerBlock = new BigNumber(farms[0].eggPerBlock)
      .div(new BigNumber(10).pow(18))
      .toNumber()
  }
  const x =[]
   farms.map((farm) => {
    // if (!farm.tokenAmount || !farm.lpTotalInQuoteToken || !farm.lpTotalInQuoteToken) {
    //   return farm
    // }
    const cakeRewardPerBlock = new BigNumber(farm.eggPerBlock || 1)
      .times(new BigNumber(farm.poolWeight))
      .div(new BigNumber(10).pow(18))
    const cakeRewardPerYear = cakeRewardPerBlock.times(BLOCKS_PER_YEAR)

    let apy = eggPrice.times(cakeRewardPerYear)

    let totalValuex = new BigNumber(farm.lpTotalInQuoteToken || 0)

    if (farm.quoteTokenSymbol === QuoteToken.BNB) {
      totalValuex = totalValuex.times(bnbPrice)
    }
    if (farm.quoteTokenSymbol === QuoteToken.ETH) {
      totalValuex = totalValue.times(EthPrice)
    }

    if (totalValuex.comparedTo(0) > 0) {
      apy = apy.div(totalValuex)
    }

    x.push(apy)
    return null
  })
  const topAPY = x.reduce(function (accumulatedValue, currentValue) {
    return Math.max(accumulatedValue, currentValue);
  });


  return (

    <div className="rbs-card h-full relative" style={{ minHeight: 400 }}>
      <div
        className="w-1/2 h-full  float-left flex flex-col items-center justify-center"
        style={{ borderRight: '1px solid #D0D0D0', paddingRight: 12 }}
      >
        <div className="text-center text-md text-white tracking-wide leading-6 font-bold">
          Stake LP tokens in Farms and Earn Up To
        </div>
        <div className="text-center my-2 text-white text-xl font-bold border-solid border-2 border-white  p-4 rounded-2xl shadow-sm w-full">
          {new BigNumber(topAPY).times(new BigNumber(100)).toNumber().toLocaleString(undefined, {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })} % APR
        </div>
        <div className="text-center text-md text-white tracking-wide leading-6 mt-8 font-bold">
          Total Value Locked (TVL)
        </div>
        <div className="text-center my-2 text-primary border-solid border-2 border-white text-2xl font-bold p-4 rounded-2xl shadow-sm w-full">
            {(totalValue.toNumber() > 0) ?
            <CardValue
            value={totalValue.toNumber()}
            prefix="$"
            decimals={2}
            fontSize="22px"
          />:
          <CardValue
          value={0}
          prefix="$"
          decimals={2}
          fontSize="22px"
        />
  
          }
        </div>
      </div>

      <div className="w-1/2 float-left" style={{ paddingLeft: 20 }}>
        <div className="text-2xl text-white font-bold mb-5">Robinia Stats</div>
        <div className="mb-2">
          <div className='text-gray-300'>USD Market Cap</div>
          
          <CardValue
            fontSize="18px"
            value={getBalanceNumber(marketCap)}
            decimals={0}
            prefix="$"
            
          />
        </div>
        <div className="mb-2">
          <div className='text-gray-300'>Total Minted</div>
         {totalSupply && (
            <CardValue
              fontSize="18px"
              value={getBalanceNumber(totalSupply)}
              decimals={0}
            />
          )}

        </div>
        <div className="mb-2">
          <div className='text-gray-300'>Total Burned</div>
         <CardValue
            fontSize="18px"
            value={getBalanceNumber(burnedBalance)}
            decimals={0}
            
          />

        </div>
        <div className="mb-2">
          <div className='text-gray-300'>Circulating Supply</div>
         {cakeSupply && <CardValue fontSize="18px" value={cakeSupply} decimals={0} />}

        </div>
        <div className="mb-2">
          <div className='text-gray-300'>RV2 Per Block</div>
          <Text bold fontSize="18px" color="white">
            {eggPerBlock}
          </Text>
        </div>
        <div className="mb-2">
          <div className='text-gray-300'>Max Supply</div>
          <Text bold fontSize="18px" color="white">
            1,000,000 RV2
          </Text>
        </div>
        <div className="absolute bottom-2 right-2 opacity-5">
          <img src="/images/trend-up.svg" alt="trend-up" width="220px" />
        </div>
      </div>
    </div>

    // <StyledCakeStats>
    //   <CardBody>
    //     <Heading size="xl" mb="24px">
    //       {TranslateString(534, 'Egg Stats')}
    //     </Heading>
    //     <Row>
    //       <Text fontSize="14px">{TranslateString(10005, 'Market Cap')}</Text>
    //       <CardValue fontSize="14px" value={getBalanceNumber(marketCap)} decimals={0} prefix="$" />
    //     </Row>
    //     <Row>
    //       <Text fontSize="14px">{TranslateString(536, 'Total Minted')}</Text>
    //       {totalSupply && <CardValue fontSize="14px" value={getBalanceNumber(totalSupply)} decimals={0} />}
    //     </Row>
    //     <Row>
    //       <Text fontSize="14px">{TranslateString(538, 'Total Burned')}</Text>
    //       <CardValue fontSize="14px" value={getBalanceNumber(burnedBalance)} decimals={0} />
    //     </Row>
    //     <Row>
    //       <Text fontSize="14px">{TranslateString(10004, 'Circulating Supply')}</Text>
    //       {cakeSupply && <CardValue fontSize="14px" value={cakeSupply} decimals={0} />}
    //     </Row>
    //     <Row>
    //       <Text fontSize="14px">{TranslateString(540, 'New EGG/block')}</Text>
    //       <Text bold fontSize="14px">{eggPerBlock}</Text>
    //     </Row>
    //   </CardBody>
    // </StyledCakeStats>
  )
}

export default CakeStats
