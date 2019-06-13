const ProjectsModels = require('../models/projects-model');
const CommentModels = require('../models/comments-model');

exports.allProjects_get = async (req, res) => {
    const allProjects = await ProjectsModels.getAll();
    console.log(allProjects)
    res.render('template', {
        locals: {
            title: 'Projects',
            projectsList: allProjects,
            is_logged_in: req.session.is_logged_in
        },
        partials: {
            partial: 'partial-projects',
        }
    });
}

exports.project_page_get = (req, res) => {
    res.render('template', {
        locals: {
            title: 'New Projects',
            is_logged_in: req.session.is_logged_in
        },
        partials: {
            partial: 'partial-addprojects'
        }
    });
}

exports.ProjectById_get = async (req, res) => {
    const ProjectId = req.params.id;
    const singleProject = await ProjectsModels.getById(ProjectId);
    const singleProjectComment = await CommentModels.getById(ProjectId);
    res.render('template', {
        locals: {
            title: 'Project Comment',
            projectDetails: singleProject,
            projectComment: singleProjectComment,
            is_logged_in: req.session.is_logged_in,
            user_id: req.session.user_id
        },
        partials: {
            partial: 'partial-comments',
        }
    });
}

exports.addProject_post = async (req, res) => {
    const { project_title, project_start, project_summary, project_url, project_open } = req.body;
    //const project_users_id = req.session.user_id
    ProjectsModels.addProject(project_title, project_start, project_summary, project_url, project_open)
    .then(async () => {
        const allProjects = await ProjectsModels.getAll();
        
        res.status(200).render('template', {
            locals: {
                title: 'Projects Updated',
                projectsList: allProjects,
                is_logged_in: req.session.is_logged_in
            },
            partials: {
                partial: 'partial-projects',
            }
        });
    })
        .catch((err) => {
        res.sendStatus(500).send(err.message);
    });
}

exports.addComment_post = async (req, res) => {
    const {comments_content, comments_users_id, comments_project_id} = req.body;
    CommentModels.addComment(comments_content, comments_users_id, comments_project_id)
    .then(async () => {
        res.redirect('/');
    })
    .catch((err) => {
        res.sendStatus(500).send(err.message);
    });
}