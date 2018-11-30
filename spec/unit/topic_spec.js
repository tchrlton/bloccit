const sequelize = require("../../src/db/models/index").sequelize;
const Topic = require("../../src/db/models").Topic;
const Post = require("../../src/db/models").Post;

describe("Topic", () => {

    beforeEach((done) => {
        this.topic;
        this.post;
        sequelize.sync({force: true}).then((res) => {

            Topic.create({
                title: "Cheap and healthy food",
                description: "Tips for eating healthy on a budget."
            })
            .then((topic) => {
                this.topic = topic;

                Post.create({
                    title: "Chicken: the best protein",
                    body: "Chicken is cheap and a lean source of protein",
                    topicId: this.topic.id
                })
                .then((post) => {
                    this.post = post;
                    done();
                });
            })
            .catch((err) => {
                console.log(err);
                done();
            });
        });
    });

    describe("#create()", () => {
        it("should create a topic object with a topic object with a title, description, and assigned topic", (done) => {
            Topic.create({
                title: "Cheap and healthy food",
                description: "Tips for eating healthy on a budget."
            })
            .then((topic) => {
                expect(topic.title).toBe("Cheap and healthy food");
                expect(topic.description).toBe("Tips for eating healthy on a budget.");
                done();

            })
            .catch((err) => {
                console.log(err);
                done();
            });
        });

        it("should not create a topic with a missing title and description.", (done) => {
            Topic.create({
                title: "Cheap and healthy food",
                description: "Tips for eating healthy on a budget"
            })
            .then((topic) => {
                done();
            })
            .catch((err) => {
                expect(err.message).toContain("Topic.title cannot be null");
                expect(err.message).toContain("Topic.description cannot be null");
            })
        });
    })

    describe("#getPost()", () => {
        it("should return the associated posts", (done) => {

            this.post.getTopic()
            .then((associatedPosts) => {
                expect(associatedPosts.title).toBe("Cheap and healthy food");
                done();
            });
        });
    });
});