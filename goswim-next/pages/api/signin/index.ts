// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { Rights } from 'src/constants';
import { UserProfile } from 'src/store/account';
import momentTz from 'moment-timezone';
import { DateFormat, CURRENCY, SUBSCRIPTION_ROUTES } from 'src/constants';

type Data = 
    { user: UserProfile; token: string }


export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  
    const token = "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWRlbnRpZmllciI6IjYzNGVhMTk5YWQ2ZjA5MDAxYzZhMmM4NyIsImlhdCI6MTY2Njc1ODAyOCwiZXhwIjoxNjcyODA2MDI4LCJhdWQiOiJhc2h3aW4uc0BheGltc29mdC5jb20iLCJpc3MiOiJheGltc29mdCBpbmMiLCJzdWIiOiJpbmZvQGF4aW1zb2Z0LmNvbSJ9.aSsQX68MkZPGR2-jj2NO1222kKQ6CbyTHa-_3YronYUHDpS8wZX8UIDzFpJxzbV69wdDuXlnjB6b28a6VEOvBQ"
    const user : UserProfile = {
        _id: '634ea199ad6f09001c6a2c87',
        address_line1: '',
        address_line2: '',
        certificate: [],
        city: '',
        country: '',
        designation: '',
        email: 'testadmin@test.com',
        experience: '',
        full_name: 'testadmin',
        login_device_type: '',
        phone: '',
        profile_picture_url: '',
        review_status: '',
        role: 'Admin',
        roster_group: [],
        state: '',
        status: 'active',
        user_app_id: '',
        zipcode: '',
        can_add_team: false,
        can_manage_current_teams: false,
        stripe_customer_id: '',
        trail_period: '',
        team: [],
        rights: Rights.ADMIN,
        isGoswimFreeUser: false,
        freeUserValidTill: 0,
        email_notification_enabled: false,
        promotion_enabled: false,
        subscription: undefined,
        teams: {
            _id: "63386418fbc73d43babca92a",
            name: "Goswim"
        },
        settings: {
            timeZone: momentTz.tz.guess(),
            dateFormat: DateFormat.MONTHDATE,
            currency: CURRENCY['usd'],
            landingPage: SUBSCRIPTION_ROUTES.Dashboard,
            serviceMaxPrice: 200,
            use_hd_video: false,
            autoplay_video: false
          }
    }
    
  res.status(200).json({ user, token })
}
