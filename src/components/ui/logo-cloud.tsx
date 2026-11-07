'use client'

import * as React from 'react'

export type BrandLogo = {
  image: string
  name: string
}

export type LogoCloudProps = {
  brandLogos?: BrandLogo[]
  username?: string
  summary?: string
  /** Seconds for one full marquee loop */
  duration?: number
  className?: string
  onViewDetails?: () => void
}

const CONTRIBUTION_LEVEL_STYLES = [
  'bg-primary/10 dark:bg-primary/15',
  'bg-primary/30 dark:bg-primary/35',
  'bg-primary/50 dark:bg-primary/55',
  'bg-primary/75 dark:bg-primary/75',
  'bg-primary dark:bg-primary'
]

const CONTRIBUTION_LEVEL_COUNTS = [0, 1, 3, 5, 8]
const CONTRIBUTION_ROWS = 6
const CONTRIBUTION_COLUMNS = 39
const TOTAL_CONTRIBUTION_CELLS = CONTRIBUTION_ROWS * CONTRIBUTION_COLUMNS
const MONTH_NAMES = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

// Weighted so most cells stay empty, like a real contribution graph
const CONTRIBUTION_LEVEL_WEIGHTS = [40, 25, 20, 10, 5]

const cx = (...classes: Array<string | false | undefined>) => classes.filter(Boolean).join(' ')

// Seeded PRNG so server and client render the same grid (no hydration mismatch)
const createRandom = (seed: number) => {
  let state = seed
  return () => {
    state = (state * 1664525 + 1013904223) % 4294967296
    return state / 4294967296
  }
}

const buildContributionGrid = () => {
  const random = createRandom(2024)

  return Array.from({ length: CONTRIBUTION_ROWS }, (_, rowIndex) =>
    Array.from({ length: CONTRIBUTION_COLUMNS }, (_, columnIndex) => {
      const roll = random() * 100
      let cumulative = 0
      let level = CONTRIBUTION_LEVEL_WEIGHTS.length - 1

      for (let i = 0; i < CONTRIBUTION_LEVEL_WEIGHTS.length; i++) {
        cumulative += CONTRIBUTION_LEVEL_WEIGHTS[i]
        if (roll < cumulative) {
          level = i
          break
        }
      }

      const daysAgo = TOTAL_CONTRIBUTION_CELLS - 1 - (columnIndex * CONTRIBUTION_ROWS + rowIndex)
      // Use fixed UTC timestamp to eliminate timezone hydration mismatch between server and client
      const date = new Date(Date.UTC(2024, 3, 30))
      date.setUTCDate(date.getUTCDate() - daysAgo)

      const dateLabel = `${date.getUTCDate()} ${MONTH_NAMES[date.getUTCMonth()]}`

      return {
        level,
        count: CONTRIBUTION_LEVEL_COUNTS[level],
        date,
        dateLabel,
      }
    })
  )
}

const CONTRIBUTION_GRID = buildContributionGrid()

const MARQUEE_CSS = `
@keyframes logo-cloud-10-marquee {
  from { transform: translateX(0); }
  to { transform: translateX(calc(-100% - var(--marquee-gap, 0.75rem))); }
}
.logo-cloud-10-track {
  animation: logo-cloud-10-marquee var(--marquee-duration, 28s) linear infinite;
}
.logo-cloud-10-track[data-reverse='true'] {
  animation-direction: reverse;
}
.logo-cloud-10-marquee:hover .logo-cloud-10-track,
.logo-cloud-10-marquee:focus-within .logo-cloud-10-track {
  animation-play-state: paused;
}
@media (prefers-reduced-motion: reduce) {
  .logo-cloud-10-track {
    animation: none;
  }
}
`

type MarqueeRowProps = {
  logos: BrandLogo[]
  duration: number
  reverse?: boolean
  label: string
}

const MarqueeRow = ({ logos, duration, reverse = false, label }: MarqueeRowProps) => (
  <div
    role='group'
    aria-label={label}
    style={{ '--marquee-duration': `${duration}s`, '--marquee-gap': '0.75rem' } as React.CSSProperties}
    className='logo-cloud-10-marquee flex gap-3 overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_5%,black_95%,transparent)] [-webkit-mask-image:linear-gradient(to_right,transparent,black_5%,black_95%,transparent)]'
  >
    {Array.from({ length: 4 }, (_, copy) => (
      <div
        key={copy}
        aria-hidden={copy > 0 ? true : undefined}
        data-reverse={reverse}
        className='logo-cloud-10-track flex shrink-0 justify-around gap-3'
      >
        {logos.map((logo, logoIndex) => (
          <div
            key={`${logo.image}-${logoIndex}`}
            className='bg-muted flex size-16 shrink-0 items-center justify-center rounded-md border border-border/60 hover:border-primary/50 transition-colors p-2.5'
            title={logo.name}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={logo.image} alt={copy > 0 ? '' : logo.name} loading='lazy' className='size-10 object-contain' />
          </div>
        ))}
      </div>
    ))}
  </div>
)

const LogoCloud = ({
  brandLogos = [],
  username = '@janusezam',
  summary = '864 contributions in the timeline',
  duration = 28,
  className,
  onViewDetails
}: LogoCloudProps) => {
  const half = Math.ceil(brandLogos.length / 2)
  const logoRows = [brandLogos.slice(0, half), brandLogos.slice(half)]

  return (
    <div className={cx('w-full', className)}>
      <style>{MARQUEE_CSS}</style>
      <div className='bg-surface border border-surface-border rounded-lg p-5 sm:p-6 flex flex-col gap-6 text-sm'>
        <div className='space-y-4'>
          <div className='flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-surface-border'>
            <div>
              <p className='text-sm font-bold font-mono text-accent'>{username}</p>
              <p className='text-text-muted text-xs font-mono'>{summary}</p>
            </div>
            <div className='flex items-center gap-4 text-xs font-mono text-text-muted self-start sm:self-auto'>
              {onViewDetails && (
                <button
                  type='button'
                  onClick={onViewDetails}
                  className='hover:text-accent transition-colors inline-flex items-center gap-1 cursor-pointer'
                >
                  <span>View Details</span>
                  <span>↗</span>
                </button>
              )}
              {onViewDetails && <span className='text-surface-border'>·</span>}
              <a
                href={`https://github.com/${username.replace('@', '')}`}
                target='_blank'
                rel='noopener noreferrer'
                className='hover:text-accent transition-colors inline-flex items-center gap-1'
              >
                <span>View on GitHub</span>
                <span>↗</span>
              </a>
            </div>
          </div>

            {/* Contribution Grid Container */}
            <div
              tabIndex={0}
              role='group'
              aria-label={`Contribution graph for ${username}`}
              className='focus-visible:ring-ring overflow-x-auto rounded-sm outline-none focus-visible:ring-2 max-md:pr-6 pb-2'
            >
              <div className='space-y-1.5 min-w-[560px]'>
                {CONTRIBUTION_GRID.map((row, rowIndex) => (
                  <div key={rowIndex} className='flex gap-1.5'>
                    {row.map((cell, columnIndex) => {
                      const text = `${cell.count} contribution${cell.count === 1 ? '' : 's'} on ${cell.dateLabel}`

                      return (
                        <div key={columnIndex} className='relative group/cell'>
                          <span
                            role='img'
                            aria-label={text}
                            className={cx(
                              'size-3.5 rounded-[2px] transition-transform duration-150 group-hover/cell:scale-125 max-lg:shrink-0 sm:size-4 cursor-pointer block',
                              CONTRIBUTION_LEVEL_STYLES[cell.level]
                            )}
                          />

                          {/* Instant Reliable CSS Tooltip (Zero SSR crash & 100% hydration safe) */}
                          <div
                            role='tooltip'
                            className='pointer-events-none absolute bottom-full left-1/2 -translate-x-1/2 mb-2 z-50 hidden group-hover/cell:flex whitespace-nowrap rounded-md bg-foreground text-background px-3 py-1.5 text-xs font-medium shadow-xl'
                          >
                            <span className='font-semibold'>
                              {cell.count} contribution{cell.count === 1 ? '' : 's'}
                            </span>
                            &nbsp;on {cell.dateLabel}
                          </div>
                        </div>
                      )
                    })}
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className='border-border -mx-6 border-t' />

          <div className='min-w-0 space-y-4'>
            <div className='flex items-center justify-between'>
              <p className='text-xs font-mono uppercase tracking-widest text-muted-foreground'>
                Technologies & Core Tools
              </p>
              <span className='text-[11px] font-mono text-muted-foreground'>
                {brandLogos.length} Technologies
              </span>
            </div>

            <div className='space-y-3'>
              {logoRows.map((row, rowIndex) => (
                <MarqueeRow
                  key={rowIndex}
                  logos={row}
                  duration={duration}
                  reverse={rowIndex === 1}
                  label={`Technology logos, row ${rowIndex + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
  )
}

export default LogoCloud
