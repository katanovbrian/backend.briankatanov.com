const routes = {
    IMAGE_FILE : 'image-file',
    BLOG_FILE : 'blog-file',
};

const common = {
    PUBLIC : 'public',
    BLOG : 'blog',
    IMAGE_FILENAME : 'imageFile',
    CONTENT_FILENAME : 'contentFile',
    PROJECT : 'project',
    IMAGE_FILE : 'IMAGE_FILE',
}

const errors = {
    BLOG_NOT_FOUND :"Blog Not Found",
    PROJECT_NOT_FOUND :"Project Not Found",
    SERVER_ERROR :"Server Error",
    ADD_IMAGE :"Add an image",
    ADD_TITLE :"Add an title",
    ADD_DESCRIPTION :"Add an description",
    ADD_LINK :"Add a link",
    ADD_CONTENT :"Add content",
}

const extensions = {
    JPG : '.jpg',
    JPEG : '.jpeg',
    PNG : '.png',
    MD : '.md',
    HTML : '.html',
    HTM : '.htm',
}

const constants = {
    routes,
    common,
    errors,
    extensions
};

module.exports = constants;