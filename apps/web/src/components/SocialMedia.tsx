import React from 'react'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from './ui/tooltip'
import Link from 'next/link'
import { FaInstagram } from 'react-icons/fa6'
import { FaTiktok } from 'react-icons/fa'
import { cn } from '@/lib/utils'

interface Props {
  className?: string
  iconClassName?: string
  tooltipClassName?: string
}

const socialLinks = [
  {
    title: 'Instagram',
    href: 'https://www.instagram.com/proudusdrip?igsh=dmlscDFyemFlOTNq',
    icon: FaInstagram,
  },
  {
    title: 'TikTok',
    href: 'https://www.tiktok.com/@proudusdrip?_r=1&_d=el123egih00566&sec_uid=MS4wLjABAAAATNvNjRXleBVGO4xClhnKfkIx_HoZqx3gkiINclUFKn3Wl93vy0sONQX-tbo4zGra&share_author_id=7480199937969275926&sharer_language=fr&source=h5_m&u_code=e144d08cahk0g1&item_author_type=2&utm_source=whatsapp&tt_from=whatsapp&enable_checksum=1&utm_medium=ios&share_link_id=9B56B696-CC42-4E5F-94BC-A38AB9B73FD7&user_id=7082424080688071686&sec_user_id=MS4wLjABAAAAXD9OMz6ATdGSju-Xle4A-UAelixn9TCGlVpnj7wS4pbmkgcRIrNLRR3T54a3jKw5&social_share_type=5&ug_btm=b6880,b5836&utm_campaign=client_share&share_app_id=1233',
    icon: FaTiktok,
  },
]

const SocialMedia = ({ className, iconClassName, tooltipClassName }: Props) => {
  return (
    <TooltipProvider>
      <div className={cn('flex items-center gap-3.5', className)}>
        {socialLinks.map((media) => (
          <Tooltip key={media.title}>
            <TooltipTrigger>
              <Link
                href={media.href}
                target='_blank'
                rel='noopener noreferrer'
                className={cn(
                  'p-2 hover:text-white hoverEffect',
                  iconClassName
                )}
              >
                <media.icon className='w-5 h-5' />
              </Link>
            </TooltipTrigger>
            <TooltipContent
              className={cn(
                'bg-white text-dark-color font-semibold',
                tooltipClassName
              )}
            >
              {media.title}
            </TooltipContent>
          </Tooltip>
        ))}
      </div>
    </TooltipProvider>
  )
}

export default SocialMedia
