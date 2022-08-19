import makeSlug from 'slugify';

const slugify = (slug: string) => makeSlug(slug, {
  lower: true,
  remove: /[*+~.()'"!:@/?]/g,
});

export default slugify;
