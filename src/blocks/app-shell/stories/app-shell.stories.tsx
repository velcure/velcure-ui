import { AppNav, AppNavAccount, AppNavItem } from '#/blocks/app-nav/src';
import { Page, PageBody, PageHeader } from '#/blocks/page/src';
import { Button } from '#/components';
import { useBoolean } from '#/hooks';
import { Meta } from '@storybook/react';
import { LuCog, LuHome, LuLogOut, LuUser } from 'react-icons/lu';
import { LoremIpsum } from 'react-lorem-ipsum';
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

const Navi = () => (
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
);

export const Basic = () => {
  const [isLoading, { toggle }] = useBoolean(false);

  return (
    <AppShell navbar={<Navi />}>
      <Page onBack="#" isLoading={isLoading}>
        <PageHeader
          title="Dashboard"
          description="Here you can manage your daily tours and assign them to your vehicles and drivers."
          actions={
            <Button size="sm" onClick={toggle}>
              {isLoading ? 'Loading...' : 'Save'}
            </Button>
          }
        />
        <PageBody>
          <div className="p-4">
            <LoremIpsum p={10} />
          </div>
        </PageBody>
      </Page>
    </AppShell>
  );
};

export const WithHero = () => {
  const [isLoading, { toggle }] = useBoolean(false);

  return (
    <AppShell navbar={<Navi />}>
      <Page onBack="#" isLoading={isLoading}>
        <PageHeader
          title="Dashboard"
          description="Here you can manage your daily tours and assign them to your vehicles and drivers."
          actions={
            <Button size="sm" onClick={toggle}>
              {isLoading ? 'Loading...' : 'Save'}
            </Button>
          }
        />
        <PageBody>
          <div className="p-4">
            <LoremIpsum p={10} />
          </div>
        </PageBody>
      </Page>
    </AppShell>
  );
};
