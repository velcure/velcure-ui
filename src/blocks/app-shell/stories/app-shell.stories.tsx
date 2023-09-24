import { AppNav, AppNavAccount, AppNavItem } from '#/blocks/app-nav/src';
import { Meta } from '@storybook/react';
import { LuCog, LuHome, LuLogOut, LuUser } from 'react-icons/lu';
import { AppShell } from '../src';

const meta: Meta = {
  title: 'Blocks / Layout / App Shell',
  component: AppShell,
  parameters: {
    layout: 'fullscreen',
  },
  decorators: [(Story) => <div className="space-y-4">{Story()}</div>],
  tags: ['autodocs'],
} satisfies Meta<typeof AppShell>;

export default meta;

export const Basic = () => {
  return (
    <AppShell
      navbar={
        <AppNav
          switcher={<div>Switch</div>}
          account={
            <AppNavAccount
              name="John Doe"
              items={[
                {
                  title: 'Profile',
                  as: 'a',
                  href: '#',
                  icon: <LuUser />,
                },
              ]}
            >
              <AppNavItem
                icon={<LuLogOut />}
                title="Signout"
                onClick={() => alert('log out')}
              />
            </AppNavAccount>
          }
          secondary={
            <>
              <AppNavItem title="Settings" icon={<LuCog />}>
                <AppNavItem as="a" href="#" title="Profile" icon={<LuUser />} />
              </AppNavItem>
            </>
          }
        >
          <AppNavItem title="Dashboard" isActive icon={<LuHome />} />
          <AppNavItem title="Disposition" />
          <AppNavItem title="Tours" />
          <AppNavItem title="Patients" />
          <AppNavItem title="Marketplace" />
          <AppNavItem title="Vehicles" />
        </AppNav>
      }
    >
      asd
    </AppShell>
  );
};
