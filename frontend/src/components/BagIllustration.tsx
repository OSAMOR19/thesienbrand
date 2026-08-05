export type BagShape = 'tote' | 'clutch' | 'crossbody' | 'bucket' | 'shoulder' | 'mini'
export type BagPattern = 'dot' | 'stripe' | 'plain' | 'grid'

interface Props {
  shape?: BagShape | string
  pattern?: BagPattern | string
  swatch?: string
  className?: string
}

const bodies: Record<string, string> = {
  tote: 'M40,70 Q40,50 60,50 L140,50 Q160,50 160,70 L155,165 Q153,175 143,175 L57,175 Q47,175 45,165 Z',
  clutch: 'M35,90 Q35,75 55,72 L145,72 Q165,75 165,90 L160,150 Q158,160 148,160 L52,160 Q42,160 40,150 Z',
  crossbody: 'M55,80 Q55,62 75,62 L125,62 Q145,62 145,80 L142,158 Q140,168 130,168 L70,168 Q60,168 58,158 Z',
  bucket: 'M50,80 Q50,62 100,62 Q150,62 150,80 L145,160 Q143,172 130,172 L70,172 Q57,172 55,160 Z',
  shoulder: 'M42,78 Q42,55 68,53 L132,53 Q158,55 158,78 L152,162 Q150,172 138,172 L62,172 Q50,172 48,162 Z',
  mini: 'M55,85 Q55,68 78,66 L122,66 Q145,68 145,85 L141,145 Q139,155 128,155 L72,155 Q61,155 59,145 Z',
}

const handles: Record<string, string> = {
  tote: 'M65,52 Q65,22 100,22 Q135,22 135,52',
  clutch: '',
  crossbody: 'M70,64 L40,20 M130,64 L160,20',
  bucket: 'M78,64 Q78,40 100,40 Q122,40 122,64',
  shoulder: 'M70,55 Q68,25 100,24 Q132,25 130,55',
  mini: 'M80,68 Q80,45 100,45 Q120,45 120,68',
}

export default function BagIllustration({ shape = 'tote', pattern = 'plain', swatch = '#0C3B36', className }: Props) {
  const safeShape = bodies[shape] ? shape : 'tote'
  const uid = `${safeShape}-${swatch.replace('#', '')}`
  const pid = `${pattern}-${uid}`
  const isLight = ['#E4D9C6', '#EDEAE1', '#D8C6A1', '#9AA0A6'].includes(swatch.toUpperCase())
  const strokeColor = isLight ? '#211D16' : '#F7F3EA'

  return (
    <svg viewBox="0 0 200 200" className={className} role="img" aria-label={`${safeShape} bag illustration`}>
      <defs>
        <pattern id={pid} width="10" height="10" patternUnits="userSpaceOnUse">
          {pattern === 'dot' && <circle cx="5" cy="5" r="1.4" fill={strokeColor} opacity="0.35" />}
          {pattern === 'stripe' && (
            <path d="M0,10 L10,0" stroke={strokeColor} strokeWidth="1.2" opacity="0.3" />
          )}
          {pattern === 'grid' && (
            <path d="M0,5 H10 M5,0 V10" stroke={strokeColor} strokeWidth="0.8" opacity="0.25" />
          )}
        </pattern>
      </defs>

      {handles[safeShape] && (
        <path
          d={handles[safeShape]}
          fill="none"
          stroke="#211D16"
          strokeWidth="4"
          strokeLinecap="round"
          opacity="0.55"
        />
      )}

      <path d={bodies[safeShape]} fill={swatch} stroke="#211D16" strokeWidth="2" strokeLinejoin="round" />
      {pattern !== 'plain' && (
        <path d={bodies[safeShape]} fill={`url(#${pid})`} stroke="none" />
      )}

      <path
        d={bodies[safeShape]}
        fill="none"
        stroke={strokeColor}
        strokeWidth="1"
        strokeDasharray="3 4"
        opacity="0.5"
        transform="scale(0.94) translate(6, 8)"
      />

      <circle cx="100" cy="85" r="3.5" fill={strokeColor} opacity="0.7" />
    </svg>
  )
}
