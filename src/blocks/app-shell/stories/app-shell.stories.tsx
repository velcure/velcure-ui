import {
  AppNav,
  AppNavAccount,
  AppNavItem,
  AppNavSwitcher,
  AppNavSwitcherItem,
} from '#/blocks/app-nav/src';
import { Page, PageBody, PageHeader } from '#/blocks/page/src';
import { Button, EmptyState } from '#/components';
import { useBoolean } from '#/hooks';
import { initials } from '#/utilities';
import { Meta } from '@storybook/react';
import { LuCog, LuHome, LuLogOut, LuUser, LuUserPlus } from 'react-icons/lu';
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
    switcher={
      <AppNavSwitcher>
        <AppNavSwitcherItem isCircle>{initials('Velcure')}</AppNavSwitcherItem>
        <AppNavSwitcherItem>Velcure</AppNavSwitcherItem>
      </AppNavSwitcher>
    }
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
      <Page onBack={() => {}} isLoading={isLoading}>
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
      <Page onBack={() => {}} isLoading={isLoading}>
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

export const Empty = () => {
  const [isLoading, { toggle }] = useBoolean(false);

  return (
    <AppShell navbar={<Navi />}>
      <Page onBack={() => {}} isLoading={isLoading}>
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
          <EmptyState
            icon={<LuUserPlus />}
            title="No Data"
            description="No data to display."
            actions={
              <>
                <Button variant="primary">Import customers</Button>
                <Button variant="secondary">Create customer</Button>
              </>
            }
          />
        </PageBody>
      </Page>
    </AppShell>
  );
};

const Err = () => {
  throw new Error('Test error');

  return null;
};

export const WithError = () => {
  const [err, { toggle, off }] = useBoolean(false);

  return (
    <AppShell navbar={<Navi />}>
      <Page
        onBack={() => {}}
        onErrorReset={off}
        onError={(err, info) => {
          console.log(err);
          console.log(info);
        }}
      >
        <PageHeader
          title="Dashboard"
          description="Here you can manage your daily tours and assign them to your vehicles and drivers."
          actions={
            <Button size="sm" onClick={toggle}>
              Toggle Error
            </Button>
          }
        />
        <PageBody>
          {err ? (
            <Err />
          ) : (
            <EmptyState
              icon={<LuUserPlus />}
              title="No Data"
              description="No data to display."
              actions={
                <>
                  <Button variant="primary">Import customers</Button>
                  <Button variant="secondary">Create customer</Button>
                </>
              }
            />
          )}
        </PageBody>
      </Page>
    </AppShell>
  );
};

export const WithText = () => {
  const [isLoading, { toggle }] = useBoolean(false);

  return (
    <AppShell navbar={<Navi />}>
      <Page onBack={() => {}} isLoading={isLoading} variant="text">
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
            <LoremIpsum p={40} />
          </div>
        </PageBody>
      </Page>
    </AppShell>
  );
};
