import { mount } from '@vue/test-utils';
import Gallery from '@crearis/theme-main/components/Gallery/Gallery.vue';

describe('<Gallery />', () => {
  it('should render component', () => {
    const { getByTestId } = mount(Gallery, {
      props: {
        images: [{ alt: 'Test', url: '/images/test.webp' }],
      },
    });

    expect(getByTestId('gallery'));
  });
});
