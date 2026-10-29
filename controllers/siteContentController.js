import SiteContent from '../models/SiteContent.js';
import { isMongoDBConnected } from '../config/db.js';
import { getStore, saveStore } from '../config/storage.js';

export const getSiteContent = async (req, res, next) => {
  try {
    if (isMongoDBConnected()) {
      let content = await SiteContent.findOne();
      if (content) {
        return res.json({ success: true, content });
      }
    }

    const store = getStore();
    return res.json({ success: true, content: store.siteContent });
  } catch (error) {
    const store = getStore();
    res.json({ success: true, content: store.siteContent });
  }
};

export const updateSiteContent = async (req, res, next) => {
  try {
    const { header, footer, about, coreValues, home, cta, sectionVisibility, faqs } = req.body;

    if (isMongoDBConnected()) {
      try {
        let content = await SiteContent.findOne();
        if (!content) {
          content = new SiteContent({});
        }

        if (header) content.header = { ...content.header, ...header };
        if (footer) content.footer = { ...content.footer, ...footer };
        if (about) content.about = { ...content.about, ...about };
        if (coreValues) content.coreValues = coreValues;
        if (home) content.home = { ...content.home, ...home };
        if (cta) content.cta = { ...content.cta, ...cta };
        if (sectionVisibility) content.sectionVisibility = { ...content.sectionVisibility, ...sectionVisibility };
        if (faqs) content.faqs = faqs;

        await content.save();
      } catch (dbErr) {
        console.warn('Mongo updateSiteContent warning:', dbErr.message);
      }
    }

    // Always update persistent local JSON store
    const store = getStore();
    if (!store.siteContent) store.siteContent = {};
    if (header) store.siteContent.header = { ...store.siteContent.header, ...header };
    if (footer) store.siteContent.footer = { ...store.siteContent.footer, ...footer };
    if (about) store.siteContent.about = { ...store.siteContent.about, ...about };
    if (coreValues) store.siteContent.coreValues = coreValues;
    if (home) store.siteContent.home = { ...store.siteContent.home, ...home };
    if (cta) store.siteContent.cta = { ...store.siteContent.cta, ...cta };
    if (sectionVisibility) store.siteContent.sectionVisibility = { ...store.siteContent.sectionVisibility, ...sectionVisibility };
    if (faqs) store.siteContent.faqs = faqs;
    saveStore(store);

    return res.json({
      success: true,
      message: 'Website content updated and saved permanently!',
      content: store.siteContent,
    });
  } catch (error) {
    next(error);
  }
};
